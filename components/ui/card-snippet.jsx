'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

import { Collapsible, CollapsibleContent } from 'components/ui/collapsible';
import { Switch } from 'components/ui/switch';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { themes } from 'config/thems';
import { hslToHex } from 'lib/utils';
import { useThemeStore } from 'store';

const CardSnippet = ({ title, code, children }) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const { theme: config } = useThemeStore();
  const newTheme = themes.find((theme) => theme.name === config);

  const hslPrimary = `hsla(${
    newTheme?.cssVars['light']['secondary-foreground']
  })`;

  const hexPrimary = hslToHex(hslPrimary);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        {title && (
          <CardTitle className="flex-1 leading-normal"> {title}</CardTitle>
        )}
        {code && (
          <div className="flex-none">
            <Switch id="airplane-mode" onClick={toggle} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {children}
        <Collapsible open={show}>
          <CollapsibleContent className="CollapsibleContent">
            <SyntaxHighlighter
              language="javascript"
              className=" rounded-md  text-sm mt-6 "
              style={atomOneDark}
              customStyle={{
                padding: '24px',
                backgroundColor: hexPrimary,
              }}
            >
              {code}
            </SyntaxHighlighter>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CardSnippet;
