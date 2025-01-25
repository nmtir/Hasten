import React from 'react';
export const DynamicElement = ({ tagName = 'div', children, ...props }) => {
  return React.createElement(tagName, props, children);
};
export function isColorDark(hex) {
  // Remove the hash (#) if it's there
  hex = hex.replace(/^#/, '');

  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate brightness using the luminance formula
  let brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return true if the color is dark, otherwise false
  return brightness < 250;
}
export const defaultFunctions = [
  {
    value: 'JustAdded',
    label: 'Just Added',
    icon: 'line-md:clipboard-arrow',
  },
  {
    value: 'InProgress',
    label: 'In Progress',
    icon: 'line-md:clipboard-list',
  },
  {
    value: 'Completed',
    label: 'Completed',
    icon: 'line-md:clipboard-check',
  },
  {
    value: 'Overdue',
    label: 'Overdue',
    icon: 'line-md:clipboard-remove',
  },
];

export const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} | ${date.toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  )}`;

  return formattedDate;
}
