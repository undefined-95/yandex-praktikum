import React, { useRef, FC } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import styles from "./draggable-constructor-card.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import { XYCoord } from "dnd-core";

// Отлично: Хорошая идея добавить типы в один type
type TItem = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  key: string;
  proteins: number;
  qty: number;
  type: string;
  _id: string;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableConstructorCard: FC<{
  item: TItem;
  onItemClick: (item: TIngredient) => void;
  index: number;
  id: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}> = ({ item, onItemClick, index, id, moveCard }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ["sauce"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: item.type,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      key={item.key}
      className={`pr-2 mb-2 ${styles.listItem}`}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <div className={styles.listIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        thumbnail={item.image_mobile}
        text={item.name}
        price={item.price}
        isLocked={false}
        handleClose={() => onItemClick(item)}
      />
    </li>
  );
};

export default DraggableConstructorCard;
