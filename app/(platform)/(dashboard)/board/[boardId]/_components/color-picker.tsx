'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Paintbrush } from 'lucide-react';

interface ColorPickerProps {
  headerColor: string;
  setHeaderColor: (color: string) => void;
}

export const ColorPicker = ({
  headerColor,
  setHeaderColor,
}: ColorPickerProps) => {
  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ backgroundColor: headerColor }}
    >
      <GradientPicker
        headerColor={headerColor}
        setHeaderColor={setHeaderColor}
      />
    </div>
  );
};

export function GradientPicker({
  headerColor,
  setHeaderColor,
  className,
}: {
  headerColor: string;
  setHeaderColor: (background: string) => void;
  className?: string;
}) {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !headerColor && 'text-muted-foreground',
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {headerColor ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ backgroundColor: headerColor }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {headerColor ? headerColor : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
          </TabsList>
          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setHeaderColor(s)}
              />
            ))}
          </TabsContent>
        </Tabs>
        <Input
          id="custom"
          value={headerColor}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setHeaderColor(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
