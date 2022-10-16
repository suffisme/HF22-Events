const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bugSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    testerApproved: {
        type: Boolean,
        default: false
    },
    adminId: {
        type: Schema.Types.ObjectId
    },
    testerIds: [Schema.Types.ObjectId],
    threatLevel: {
        type: String
    },
    developerIds: [Schema.Types.ObjectId],
    developerWorked: {
        type: Boolean,
        default: false
    },
    testerVerified: {
        type: Boolean,
        default: false
    },
    comments : [
                {
                    userId: {type: Schema.Types.ObjectId, required: true},
                    comment: {type: String, required: true}
                }
        ]
    
});

module.exports = mongoose.model('Bug', bugSchema);

