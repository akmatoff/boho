import { useEffect, useState } from "react";
import getMenuItems from "../../../api/getMenuItems";
import type { Category, MenuItem } from "../../../types";
import TextBasedMenuItem from "./TextBasedMenuItem";
import Loader from "../../Loader";

interface Props {
  category: Category;
  lang?: string;
  menu?: string;
}

export default function TextBasedCategory({
  category,
  lang = "ru",
  menu,
}: Props) {
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

  return (
    <div className="space-y-1">
      {isLoading && <Loader />}
      {!isLoading &&
        menuItems.map((item) => (
          <TextBasedMenuItem key={item.id} item={item} menu={menu} />
        ))}
    </div>
  );
}
