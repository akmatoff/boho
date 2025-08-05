import type { MenuAddition } from "../types";
import { formatNumber } from "../utils";

interface Props {
  addition: MenuAddition;
}

export default function Addition({ addition }: Props) {
  return (
    <div key={addition.name} className="flex items-center justify-between">
      <p className="text-[16px] md:text-[25px]">{addition.name}</p>

      <div className="flex items-center space-x-2">
        {addition.weight && (
          <>
            <span className="text-[16px] md:text-[25px]">
              {addition.weight}
            </span>
            <span className="block bg-category w-2 h-2 rounded-full" />
          </>
        )}
        <p className="text-[16px] md:text-[25px]">
          {formatNumber(addition.price)}
        </p>
      </div>
    </div>
  );
}
