import type { MenuItem } from "../../../types";
import { forceHttps, formatNumber } from "../../../utils";
import classNames from "classnames";
import Addition from "../../Addition";

interface Props {
  menuItem: MenuItem;
  index: number;
  length: number;
}

export default function MenuItemComponent({ menuItem, length, index }: Props) {
  const price = formatNumber(menuItem.price);

  return (
    <div
      className={classNames(
        "space-y-4 min-h-[96dvh]",
        index === length - 1 &&
          length % 2 !== 0 &&
          "col-span-2 justify-self-center"
      )}
    >
      <article className="flex flex-col items-center space-x-2">
        <figure className="grid place-content-end place-items-center flex-[1_1_60%] md:flex-[1_1_50%]">
          <img
            src={forceHttps(menuItem.image) || menuItem.image}
            alt={menuItem.name}
            className="w-[470px] h-[470px] object-contain"
          />
        </figure>

        <div className="self-center flex flex-col items-center flex-[1_1_40%] md:flex-[1_1_50%]">
          <h2 className="inline-block px-4 py-1 border border-primary font-semibold text-[16px] md:text-[28px] text-center uppercase">
            {menuItem.name}
          </h2>
          <p className="text-muted text-[14px] md:text-[20px] text-center lg:px-20">
            {menuItem.description}
          </p>

          <p className="text-[14px] md:text-[25px] font-semibold">{price}</p>
        </div>
      </article>

      {menuItem.additions.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold text-[16px] md:text-[25px]">
            Дополнение
          </h2>
          <div className="space-y-1">
            {menuItem.additions.map((addition) => (
              <Addition key={addition.id} addition={addition} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
