from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, RadioField, FileField
from wtforms.validators import Length, EqualTo, Email, DataRequired, ValidationError
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, UserMixin, logout_user
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flash_cards.db'
app.config['SECRET_KEY'] = '80b41981c0fb8718c11966d3'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

@login_manager.user_loader
def load_user(user_id):
    return user.query.get(int(user_id))

class user(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(length=30), nullable=False, unique=True)
    email = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    profile_picture = db.Column(db.Text, default='', nullable=False)
    decks = db.relationship('deck', backref='owned_user', lazy=True)
    def __repr__(self):
        return f'user {self.username}'
    def get_id(self):
        return self.user_id
    @property
    def password(self):
        return self.password
    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(plain_text_password).decode('utf-8')
    def check_password(self, tried_password):
        return bcrypt.check_password_hash(self.password_hash, tried_password)

class deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(length=50), nullable=False)
    score = db.Column(db.Float(precision=2), nullable=False, default=0)
    temp_score = db.Column(db.Float, nullable=False, default=0)
    times = db.Column(db.Integer, nullable=False, default=0)
    last_score = db.Column(db.Integer, nullable=False, default=0)
    last_review = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    owner = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    cards = db.relationship('card', backref='parent', lazy=True)
    def __repr__(self):
        return f'deck {self.name}'

class card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(length=70), nullable=False)
    answer = db.Column(db.String(length=200), nullable=False)
    parent_deck = db.Column(db.Integer, db.ForeignKey('deck.id'))

class RegisterForm(FlaskForm):
    def validate_username(self, username_to_check):
        usr = user.query.filter_by(username=username_to_check.data).first()
        if usr:
            raise ValidationError('Username already exists! Please try a different username.')
    def validate_email(self, email_to_check):
        e = user.query.filter_by(email=email_to_check.data).first()
        if e:
            raise ValidationError('Email already exists! Please try a different email address.')
    username = StringField(label='Username:', validators=[Length(min=2, max=30), DataRequired()])
    email = StringField(label='Email Address:', validators=[Email(), DataRequired()])
    password1 = PasswordField(label='Password:', validators=[Length(min=6), DataRequired()])
    password2 = PasswordField(label='Confirm Password:', validators=[EqualTo('password1'), DataRequired()])
    submit = SubmitField(label='Submit')

class LoginForm(FlaskForm):
    username = StringField(label='Username:', validators=[DataRequired()])
    password = PasswordField(label='Password:', validators=[DataRequired()])
    submit = SubmitField(label='Sign in')

class AddDeckForm(FlaskForm):
    name = StringField(label='Deck Name:', validators=[DataRequired()])
    submit = SubmitField(label='Create Deck')

class AddCardForm(FlaskForm):
    question = StringField(label='Question:', validators=[DataRequired()])
    answer = StringField(label='Answer:', validators=[DataRequired()])
    submit = SubmitField(label='Create Card')

class DifficultyForm(FlaskForm):
    difficulty = RadioField(label = 'Difficulty: ', choices = [('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')])
    submit = SubmitField(label = 'Next')

class DifficultyFormLast(FlaskForm):
    difficulty = RadioField(label = 'Difficulty: ', choices = [('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')])
    submit = SubmitField(label = 'Exit')

class ChangeDeckNameForm(FlaskForm):
    update_name = StringField(label='Update Name:', validators=[DataRequired()])
    submit = SubmitField(label='Confirm')

class EditCardForm(FlaskForm):
    update_question = StringField(label='Update Question:')
    update_answer = StringField(label='Update Answer:')
    submit = SubmitField(label='Confirm')

class AddPhotoForm(FlaskForm):
    file = FileField(label='Upload Profile Photo:')
    submit = SubmitField(label='Submit')


@app.route('/')
@app.route('/home')
def home():
    return render_template('homepage.html')

@app.route('/<uid>/decks', methods=['GET', 'POST'])
def decks(uid):
    decks = deck.query.filter_by(owner=uid)
    cards = []
    for d in decks:
        temp = card.query.filter_by(parent_deck=d.id).first()
        cards.append(temp)
    return render_template('decks.html', items = decks, uid = uid, cards = cards, l=len(cards))

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = user(username=form.username.data, email=form.email.data, password=form.password1.data)
        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(f'Account created successfully! You are now logged in as {user_to_create.username}.', category='success')
        if form.username.data == 'admin':
            return redirect(url_for('admin_page'))
        return redirect(url_for('decks', uid=user_to_create.user_id))
    if form.errors != {}:
        for err in form.errors.values():
            flash(err[0], category='danger')
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        current_user = user.query.filter_by(username=form.username.data).first()
        if current_user and current_user.check_password(form.password.data):
            login_user(current_user)
            flash(f'Success! You are logged in as {current_user.username}.', category='success')
            if current_user.username == 'admin':
                return redirect(url_for('admin_page'))
            return redirect(url_for('decks', uid=current_user.user_id))
        flash('Username and password mismatch!', category='danger')

    return render_template('login.html', form=form)

@app.route('/logout' , methods=['GET', 'POST'])
def logout():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for('login'))

@app.route('/<uid>/add_deck', methods=['GET', 'POST'])
def add_deck(uid):
    form = AddDeckForm()
    if request.method=="POST":
        current_deck = deck(name=form.name.data, owner=uid)
        db.session.add(current_deck)
        db.session.commit()
        return redirect(url_for('decks', uid=uid))
    return render_template('add_deck.html', form=form)

@app.route('/<uid>/<deckid>/delete_deck', methods=['GET', 'POST'])
def delete_deck(uid, deckid):
    cards_to_delete = card.query.filter_by(parent_deck=deckid)
    for i in cards_to_delete:
        card.query.filter_by(id=i.id).delete()
    deck.query.filter_by(id=deckid).delete()
    db.session.commit()
    return redirect(url_for('decks', uid=uid))

@app.route('/<uid>/<deckid>/add_card', methods=['GET', 'POST'])
def add_card(uid, deckid):
    form = AddCardForm()
    if request.method == 'POST':
        current_card = card(question=form.question.data, answer=form.answer.data, parent_deck=deckid)
        db.session.add(current_card)
        db.session.commit()
        return redirect(url_for('decks', uid=uid))
    return render_template('add_card.html', form=form)

@app.route('/<uid>/<deckid>/<cardid>/show_card', methods=['GET', 'POST'])
def show_card(uid, deckid, cardid):
    parent = deck.query.filter_by(id=deckid).first()
    cards = card.query.filter_by(parent_deck=deckid)
    c = card.query.filter_by(id=cardid).first()
    l = []
    for i in cards:
        l.append(i)
    next_card = None
    for i in range(len(l) - 1):
        if l[i].id == int(cardid):
            next_card = l[i+1]
    form = DifficultyForm()
    d = form.difficulty.data
    if d == 'easy':
        score=10
    elif d == 'medium':
        score=5
    else:
        score=0
    temp = deck.query.filter_by(id=deckid).first()
    temp.temp_score = deck.temp_score + score
    db.session.commit()
    return render_template('show_card.html', uid=uid, deckid=deckid, curr=c, next=next_card, form=form, parent=parent)

@app.route('/<uid>/<deckid>/<cardid>/show_last', methods=['GET', 'POST'])
def show_last(uid, deckid, cardid):
    form = DifficultyForm()
    d = form.difficulty.data
    if d == 'easy':
        score=10
    elif d == 'medium':
        score=5
    else:
        score=0
    temp = deck.query.filter_by(id=deckid)
    temp.update(dict(last_review = datetime.datetime.now()))
    temp = temp.first()
    temp.temp_score = deck.temp_score + score
    temp.score = ((deck.score * temp.times) + temp.temp_score) / (temp.times + 1)
    temp.times = deck.times + 1
    temp.last_score = temp.temp_score
    temp.temp_score = 0
    db.session.commit()
    return redirect(url_for('decks', uid=uid))

@app.route('/<uid>/<deckid>/edit_deck', methods=['GET', 'POST'])
def edit_deck(uid, deckid):
    cards = card.query.filter_by(parent_deck=deckid)
    return render_template('edit_deck.html', items = cards, uid = uid, deckid = deckid)

@app.route('/<uid>/<deckid>/view_deck', methods=['GET', 'POST'])
def view_deck(uid, deckid):
    cards = card.query.filter_by(parent_deck=deckid)
    deck_to_view = deck.query.filter_by(id=deckid).first()
    return render_template('view_deck.html', items = cards, uid = uid, deckid = deckid, deck_to_view = deck_to_view)

@app.route('/<uid>/<deckid>/deck_name', methods=['GET', 'POST'])
def change_deck_name(uid, deckid):
    form = ChangeDeckNameForm()
    if request.method == 'POST':
        new_name = form.update_name.data
        deck_to_change = deck.query.filter_by(id=deckid)
        deck_to_change.update(dict(name=new_name))
        db.session.commit()
        return redirect(url_for('decks', uid=uid))
    return render_template('change_deck_name.html', form=form)

@app.route('/<uid>/<deckid>/<cardid>/delete_card', methods=['GET', 'POST'])
def delete_card(uid, deckid, cardid):
    card.query.filter_by(id=cardid).delete()
    db.session.commit()
    return redirect(url_for('edit_deck', uid=uid, deckid=deckid))

@app.route('/<uid>/<deckid>/exit_from_view', methods=['GET', 'POST'])
def exit_from_view(uid, deckid):
    temp = deck.query.filter_by(id=deckid).first()
    temp.temp_score = 0
    db.session.commit()
    return redirect(url_for('decks', uid=uid))

@app.route('/<uid>/<deckid>/<cardid>/edit_card', methods=['GET', 'POST'])
def edit_card(uid, deckid, cardid):
    form = EditCardForm()
    item = card.query.filter_by(id=cardid).first()
    if request.method == 'POST':
        new_question = form.update_question.data
        new_answer = form.update_answer.data
        card_to_edit = card.query.filter_by(id=cardid)
        if new_question:
            card_to_edit.update(dict(question=new_question))
        if new_answer:
            card_to_edit.update(dict(answer=new_answer))
        db.session.commit()
        return redirect(url_for('edit_deck', uid=uid, deckid=deckid))
    return render_template('edit_card.html', form=form, item=item)

@app.route('/<uid>/<deckid>/reset_deck', methods=['GET', 'POST'])
def reset_deck(uid, deckid):
    deck_to_change = deck.query.filter_by(id=deckid)
    deck_to_change.update(dict(score=0, times=0, last_score=0))
    db.session.commit()
    return redirect(url_for('decks', uid=uid))

@app.route('/<uid>/<deckid>/clear_deck', methods=['GET', 'POST'])
def clear_deck(uid, deckid):
    cards_to_delete = card.query.filter_by(parent_deck=deckid)
    for i in cards_to_delete:
        card.query.filter_by(id=i.id).delete()
    return reset_deck(uid, deckid)

@app.route('/<uid>/view_profile', methods=['GET', 'POST'])
def view_profile(uid):
    form = AddPhotoForm()
    profile_to_view = user.query.filter_by(user_id=uid).first()
    decks_to_view = deck.query.filter_by(owner=uid)
    decks = []
    for i in decks_to_view:
        decks.append(i)
    return render_template('profile.html', uid=uid, item=profile_to_view, form=form, decks=decks)

@app.route('/admin_page', methods=['GET', 'POST'])
def admin_page():
    users = user.query.all()
    avg = []
    for i in users:
        total = 0
        count = 0
        decks = deck.query.filter_by(owner=i.user_id)
        for j in decks:
            total += j.score
            count += 1
        if count == 0:
            avg.append(-1)
            continue
        avg.append(total / count)
    return render_template('users.html', users=users, avg=avg, l=len(avg))

@app.route('/<uid>/view_user', methods=['GET', 'POST'])
def view_user(uid):
    decks = deck.query.filter_by(owner=uid)
    owner = user.query.filter_by(user_id=uid).first()
    cards = []
    for d in decks:
        temp = card.query.filter_by(parent_deck=d.id).first()
        cards.append(temp)
    return render_template('admin_view_decks.html', items=decks, owner=owner, cards=cards, l=len(cards), uid=uid)

@app.route('/<uid>/admin_delete_user', methods=['GET', 'POST'])
def admin_delete_user(uid):
    decks_to_delete = deck.query.filter_by(owner=uid)
    for i in decks_to_delete:
        cards_to_delete = card.query.filter_by(parent_deck=i.id)
        for j in cards_to_delete:
            card.query.filter_by(id=j.id).delete()
        deck.query.filter_by(id=i.id).delete()
    user.query.filter_by(user_id=uid).delete()
    db.session.commit()
    return redirect(url_for('admin_page'))

@app.route('/<uid>/<deckid>/<cardid>/admin_show_card', methods=['GET', 'POST'])
def admin_show_card(uid, deckid, cardid):
    parent = deck.query.filter_by(id=deckid).first()
    cards = card.query.filter_by(parent_deck=deckid)
    c = card.query.filter_by(id=cardid).first()
    l = []
    for i in cards:
        l.append(i)
    next_card = None
    for i in range(len(l) - 1):
        if l[i].id == int(cardid):
            next_card = l[i+1]
    return render_template('admin_show_card.html', uid=uid, deckid=deckid, curr=c, next=next_card, parent=parent)

@app.route('/<uid>/<deckid>/<cardid>/admin_show_last', methods=['GET', 'POST'])
def admin_show_last(uid):
    return redirect(url_for('view_user', uid=uid))

@app.route('/<uid>/admin_exit_from_view', methods=['GET', 'POST'])
def admin_exit_from_view(uid):
    return redirect(url_for('view_user', uid=uid))

@app.route('/<uid>/<deckid>/admin_delete_deck', methods=['GET', 'POST'])
def admin_delete_deck(uid, deckid):
    cards_to_delete = card.query.filter_by(parent_deck=deckid)
    for i in cards_to_delete:
        card.query.filter_by(id=i.id).delete()
    deck.query.filter_by(id=deckid).delete()
    db.session.commit()
    return redirect(url_for('view_user', uid=uid))

@app.route('/<uid>/<deckid>/admin_list_cards', methods=['GET', 'POST'])
def admin_list_cards(uid, deckid):
    owner = user.query.filter_by(user_id=uid).first()
    parent = deck.query.filter_by(id=deckid).first()
    cards = card.query.filter_by(parent_deck=deckid)
    return render_template('admin_list_cards.html', uid=uid, deckid=deckid, cards=cards, owner=owner, parent=parent)

@app.route('/<uid>/<deckid>/<cardid>/admin_show_single_card', methods=['GET', 'POST'])
def admin_show_single_card(uid, deckid, cardid):
    parent = deck.query.filter_by(id=deckid).first()
    c = card.query.filter_by(id=cardid).first()
    return render_template('show_single_card.html', uid=uid, deckid=deckid, curr=c, parent=parent)

@app.route('/<uid>/<deckid>/<cardid>/admin_delete_card', methods=['GET', 'POST'])
def admin_delete_card(uid, deckid, cardid):
    card.query.filter_by(id=cardid).delete()
    db.session.commit()
    return redirect(url_for('admin_list_cards', uid=uid, deckid=deckid))


if __name__ == '__main__':
    app.run(port = 8000, debug=True)
