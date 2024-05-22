import mongoose, {Schema, Document} from 'mongoose';

/* 1 -> ********** Message Schema ********** */
// interface
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

//const MessageSchema = new Schema({});
const MessageSchema: Schema<Message> = new Schema({
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true,
        default: Date.now 
    }
});


/* 2 -> ********** User Schema ********** */
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry : Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    verifyCode: {
        type: String,
        required: [true, 'Verification code is required']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verification code expiry is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);
export default UserModel;