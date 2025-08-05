import { useEffect, useState } from "react";
import type { Category, MenuItem } from "../../../types";
import getMenuItems from "../../../api/getMenuItems";
import TwoInARowMenuItem from "./TwoInArowMenuItem";
import Loader from "../../Loader";

interface Props {
  category: Category;
  lang?: string;
  menu?: string;
}

export default function TwoInARow({ category, lang = "ru", menu }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuItems(
          { category: category.id },
          lang || "ru"
        );

        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setMenuItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isOdd = menuItems.length % 2 !== 0;
  const lastIndex = menuItems.length - 1;

  return (
    <div className="grid grid-cols-2 my-8 gap-12 place-content-center">
      {isLoading && <Loader />}
      {!isLoading &&
        menuItems.map((item, index) => {
          const isLastAndOdd = isOdd && index === lastIndex;
          return (
            <TwoInARowMenuItem
              key={item.id}
              item={item}
              shouldBeCentered={isLastAndOdd}
              menu={menu}
            />
          );
        })}
    </div>
  );
}
