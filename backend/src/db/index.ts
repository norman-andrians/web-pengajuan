import { KeluhanModel, UserModel } from "./model";

export class User {
    public static create = async (values: Record<string, any>) => {
        const user = await new UserModel(values).save();
        return user.toObject();
    }

    public static getByEmail = (email: string) => UserModel.findOne({ email });

    public static getBySessionToken = (token: string) => {
        return UserModel.findOne({ token });
    }
}

export class Keluhan {
    public static create = async (values: Record<string, any>) => {
        const keluhan = await new KeluhanModel(values).save();
        return keluhan.toObject();
    }
}
