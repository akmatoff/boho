import type { MenuItem } from "../../../types";
import { forceHttps } from "../../../utils";
import VolumeAndPrice from "../../VolumeAndPrice";
import classNames from "classnames";

interface Props {
  item: MenuItem;
  shouldBeCentered?: boolean;
  menu?: string;
}

export default function TwoInARowMenuItem({
  item,
  shouldBeCentered = false,
  menu = "",
}: Props) {
  const isBar = menu === "bar";

  return (
    <article
      className={classNames(
        "flex flex-col items-center justify-end",
        shouldBeCentered && "col-span-2 justify-self-center"
      )}
    >
      <img
        src={forceHttps(item.image) || item.image}
        alt={item.name}
        className="h-[280px] md:h-[380px] lg:h-[420px] w-auto object-contain scale-[104%]"
      />
      <h2 className="mt-4 text-[20px] md:text-[28px] font-bold">{item.name}</h2>

      <div
        className={classNames(
          "bg-category rounded-lg h-[1px] w-[60%] my-1",
          isBar && "bg-categorySecondary"
        )}
      ></div>

      <p className="text-[9px] md:text-[14px] text-center">
        {item.description}
      </p>

      <VolumeAndPrice
        volume={item.volume}
        price={item.price}
        isBar={isBar}
        boldPrice
      />
    </article>
  );
}
