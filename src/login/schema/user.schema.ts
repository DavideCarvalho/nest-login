import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as crypto from 'crypto';

export interface IUser extends Document {
  name: string;
  email: string;
  senha: string;
  salt: string;
  ultimo_login: string;
  telefones: [{ numero: number, ddd: number }];
  data_criacao;
  data_atualizacao;
}

export const User = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  salt: String,
  ultimo_login: String,
  telephones: [
    {
      numero: Number,
      ddd: Number,
    },
  ],
}, { timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' } });

User.methods.validPassword = function(password) {
  console.log(this.salt);
  console.log(crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`));
  console.log(this.senha);
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.senha === hash;
};

User.set('timestamps', true);
