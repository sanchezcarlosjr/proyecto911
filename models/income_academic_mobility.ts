import mongoose, {Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({_id: String}, {
    strict: false,
    toJSON: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
schema.plugin(mongoosePaginate);
export default mongoose.models.income_academic_mobility || mongoose.model('income_academic_mobility', schema);