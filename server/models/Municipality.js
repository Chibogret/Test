const mongoose = require('mongoose');

const CheckpointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    operationalStatus: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive', 'Under Maintenance']
    },
    timesOfActivity: {
        type: String,
        required: true
    }
});

const MovementDataSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const MunicipalitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    checkpoint: {
        type: CheckpointSchema,
        required: true
    },
    asfStatus: {
        type: String,
        required: true,
        enum: ['No Cases', 'Monitoring', 'Outbreak', 'Contained']
    },
    movementData: [MovementDataSchema],
    alerts: [{
        message: String,
        severity: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    contactInfo: {
        veterinaryAuthority: {
            name: String,
            phoneNumber: String,
            email: String
        },
        emergencyResponseTeam: {
            name: String,
            phoneNumber: String,
            email: String
        }
    }
});

module.exports = mongoose.model('Municipality', MunicipalitySchema);
