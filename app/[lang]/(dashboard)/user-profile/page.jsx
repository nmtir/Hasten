import React from 'react';
import Settings from './settings/settings';
import {
  getTags,
  getUser,
  getUserPriorities,
} from '../../../../config/data.config';

const ProfilePage = async () => {
  const user = await getUser();
  const priorities = await getUserPriorities(user.id);
  const tags = await getTags(user.id);
  return <Settings tags={tags} priorities={priorities} />;
};

export default ProfilePage;
