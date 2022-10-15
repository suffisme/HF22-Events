// import User and Events

exports.unregisterEvent = (req, res) => {
  const event_id = req.params.id;
  const user_id = req.auth._id;

  Event.findById(event_id, (err, event) => {
    if (!err) {
      if (event.participant.indexOf(user_id) > -1) {
        event.participant.splice(event.participant.indexOf(user_id));
        event.save();

        User.findById(user_id, (err, user) => {
          if (!err) {
            if (user.eventsEnrolled.indexOf(event.eventID) > -1) {
              event.participant.splice(
                event.participant.indexOf(event.eventID)
              );
              user.save();

              return res.json({
                message: "Unregister Successfully",
              });
            }
          } else {
            res.json({ message: "User Cannot Dislike Post" });
            return;
          }
        });
        return;
      } else {
        res.json({
          message: "Cannot dislike the blog which has not been liked",
        });
        return;
      }
    } else {
      res.json({ message: "Cannot Dislike Post" });
    }
  });
};