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
    <p className="flex items-center space-x-4">
      {volume && <span className="text-[16px] md:text-[25px]">{volume}</span>}
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
