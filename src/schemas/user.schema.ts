import { SchemaObject } from 'neode';

const UserSchema: SchemaObject = {
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    unique: true,
    required: true,
  },
};

export default UserSchema;
