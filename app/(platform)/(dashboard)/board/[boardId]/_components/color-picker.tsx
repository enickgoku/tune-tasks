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
import { updateListColor } from '@/actions/update-list/update-list-header-color';
import { useAction } from '@/hooks/use-action';
import { hexToRGBA } from '@/lib/hex-to-rgba';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useDebounceCallback } from 'usehooks-ts';
import { useState } from 'react';
import { COMMON_COLORS } from '@/constants/common-colors';

interface ColorPickerProps {
  headerColor: string;
  setHeaderColor: (color: string) => void;
  listId: string;
  setColorPickerOpen?: (open: boolean) => void;
}

export const ColorPicker = ({
  headerColor,
  setHeaderColor,
  listId,
  setColorPickerOpen,
}: ColorPickerProps) => {
  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ backgroundColor: headerColor }}
    >
      <GradientPicker
        headerColor={headerColor}
        setHeaderColor={setHeaderColor}
        listId={listId}
        setColorPickerOpen={setColorPickerOpen}
      />
    </div>
  );
};

interface GradientPickerProps {
  headerColor: string;
  setHeaderColor: (background: string) => void;
  className?: string;
  listId: string;
  setColorPickerOpen?: (open: boolean) => void;
}

export const GradientPicker = ({
  headerColor,
  setHeaderColor,
  className,
  listId,
  setColorPickerOpen,
}: GradientPickerProps) => {
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
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState<string>(headerColor);

  const { execute, isLoading } = useAction(updateListColor, {
    onSuccess: () => {
      toast.success('Updated list color', { id: 'listColorUpdate' });
      if (setColorPickerOpen) {
        setColorPickerOpen(false);
      }
    },
    onError: (error) => {
      toast.error(error.toString(), { id: 'listColorError' });
    },
  });

  const convertColorNameToHex = (colorName: string) => {
    const colors: { [key: string]: string } = COMMON_COLORS;
    return colors[colorName.toLowerCase()] || colorName;
  };

  const handleColorChange = useDebounceCallback((color: string) => {
    let valueToUse = color.includes('#') ? color : convertColorNameToHex(color);
    const rgbaValue = hexToRGBA(valueToUse);
    if (rgbaValue) {
      setHeaderColor(valueToUse);
      execute({
        headerColor: rgbaValue,
        id: listId,
        boardId: params.boardId as string,
      });
    }
  }, 1500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedColor(newValue);
    handleColorChange(newValue);
  };

  const solidColorClicked = (color: string) => {
    const rgbaValue = hexToRGBA(color);
    if (!rgbaValue) return;

    setHeaderColor(color);
    execute({
      headerColor: rgbaValue,
      id: listId,
      boardId: params.boardId as string,
    });

    if (setColorPickerOpen) setColorPickerOpen(false);
  };

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
                className="h-4 w-4 rounded"
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
                onClick={() => solidColorClicked(s)}
                aria-disabled={isLoading}
              />
            ))}
          </TabsContent>
        </Tabs>
        <Input
          id="custom"
          value={selectedColor}
          className="col-span-2 h-8 mt-4"
          onChange={handleChange}
          disabled={isLoading}
        />
      </PopoverContent>
    </Popover>
  );
};
