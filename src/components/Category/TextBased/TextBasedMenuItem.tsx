import type { MenuItem } from "../../../types";
import VolumeAndPrice from "../../VolumeAndPrice";

interface Props {
  item: MenuItem;
  menu?: string;
}

export default function TextBasedMenuItem({ item, menu = "" }: Props) {
  const isBar = menu === "bar";

  return (
    <article className="flex items-start justify-between space-x-4 text-[18px] md:text-[25px]">
      <div>
        <p className="text-[16px] md:text-[25px]">{item.name}</p>
        <p className="text-muted text-[12px] md:text-[18px]">
          {item.description}
        </p>
      </div>
      <VolumeAndPrice
        volume={item.volume ?? item.weight}
        price={item.price}
        isBar={isBar}
      />
    </article>
  );
}
