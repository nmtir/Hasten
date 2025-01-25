"use client"
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Label } from 'components/ui/label';
import { Progress } from 'components/ui/progress';
import React, { useEffect, useState } from 'react';
import { useUser } from 'provider/userProvider';

function calculateProfileProgress(user) {
  // Define the fields to check for completion
  const fields = [
    'name',    // 20% for last name
    'username',   // 20% for first name
    'email',       // 20% for email or provider
    'image',       // 20% for image
    'about'        // 20% for about
  ];

  // Count how many fields are completed
  let completedFields = 0;

  fields.forEach(field => {
    console.log(field, ':', user[field]);
    if (user[field] && user[field].trim() !== "") {
      console.log('true');
      completedFields += 1;
    }
    console.log(completedFields);
  });

  // Calculate progress percentage
  return (completedFields / fields.length) * 100;
}


const ProfileProgress = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(calculateProfileProgress(user));
  useEffect(() => {
    setProgress(calculateProfileProgress(user));
  }, [user]);
  return (
    <Card>
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex flex-col items-end gap-1">
          <Label className="text-sm font-medium text-default-700">{progress}% Complete</Label>
          <Progress value={progress} color="primary" isStripe className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgress;
