// import Events, Users and other models

exports.registerEvent = (req, res) => {
  const cur_user = req.auth;
  const eventID = req.params.id;
  Event.findOne({eventID: eventID}, (err, event) => {
    if (err || !event) {
      return res.status(400).json({ message: err.message });
    } else {
      if (event.participant.findIndex(function(participant, index) {if(participant.userID == cur_user._id)return true;}) > -1) {
        return res.json({ message: "Participant Already Registered" });
      } else {
        User.findById(cur_user._id, (err, user) => {
          if (err || !user) {
            return res
              .status(400)
              .json({ message: "Couldn't find participant" });
          } else {
            if (user.eventsEnrolled.indexOf(event.eventID) > -1) {
              return res.json({ message: "Participant Already Registered" });
            } else {
              user.eventsEnrolled.push({eventID:event.eventID, name:event.name});
              user.save();
              event.participant.push({userID: cur_user._id, name: user.name, email: user.email});
              event.save();
            }
          }
        });
        res.json({ message: "Participant Registered Successfully" });
      }
    }
  });
};