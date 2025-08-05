import { formatNumber } from "../utils";
import classNames from "classnames";

interface Props {
  volume?: string;
  price: string;
  isBar: boolean;
  boldPrice?: boolean;
}

export default function VolumeAndPrice({
  volume,
  price,
  isBar,
  boldPrice = false,
}: Props) {
  return (
    <p className="flex items-center space-x-2">
      {volume && <span className="text-[16px] md:text-[25px]">{volume}</span>}
      {volume && (
        <span
          className={classNames(
            "block bg-category w-[6px] h-[6px] md:w-2 md:h-2 rounded-full",
            isBar && "bg-categorySecondary"
          )}
        />
      )}
      <span
        className={classNames(
          boldPrice ? "font-semibold" : "",
          "text-[16px] md:text-[25px]"
        )}
      >
        {formatNumber(price)}
      </span>
    </p>
  );
}
