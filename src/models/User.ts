import {model, models, Schema} from 'mongoose';

// Para los models en TS tengo que agregar como las clases y de que tipo seran las vbles . ademoas de definirals en el Shcema de Monogo, debo definiralas para ts
type ModelsType = {
  User: any;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
};

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Date,
});

export const User = (models as ModelsType)?.User || model('User', userSchema);