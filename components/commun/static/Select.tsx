import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

const CustomSelect = ({
  onChange,
  options,
  className,
  contenClassName,
  value,
}: {
  onChange: (type: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  contenClassName?: string;
  value?: string;
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          `h-12 w-36 truncate pl-4 pr-4 text-black font-semibold   bg-white drop-shadow-none shadow-none rounded-lg 
            `,
          className
        )}
      >
        <div
          className="w-5/6  overflow-hidden
                    flex justify-start"
        >
          <p>
            <SelectValue placeholder={options[0].label} />
          </p>
        </div>
      </SelectTrigger>
      <SelectContent className={cn('h-32', contenClassName)}>
        {options.map((option, idx) => {
          return (
            <SelectItem
              key={idx}
              className={`w-full h-10 text-sm font-semibold
                        hover:bg-[#C8ADE4]  hover:cursor-pointer `}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
