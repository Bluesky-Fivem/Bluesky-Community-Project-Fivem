import { useRecoilState } from 'recoil';
import {
  DragSource,
  INVENTORY_EVENTS,
  PropSlot,
} from '../../../../types/types';
import { inventoryState } from '../../../hooks/state';
import { useDrag, useDrop } from 'react-dnd';
import { MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { fetchNui } from '../../../../utils/fetchNui';
import './slots.styles.css';
import { GetOpenSlot } from '../../../../utils/slots';

export default function Slot({
  index,
  draggable,
  invType,
  owner,
  item,
}: PropSlot) {
  const [playerInventory, setPlayerInventory] = useRecoilState(
    inventoryState.playerInventory,
  );

  const [secondaryInventory, setSecondInventory] = useRecoilState(
    inventoryState.secondInventory,
  );

  const [, setHoveredItem] = useRecoilState(inventoryState.hoverItem);

  const [hoveredSlot, setHoveredSlot] = useRecoilState(
    inventoryState.hoveredSlot,
  );

  const [moveAmount] = useRecoilState(inventoryState.moveAmount);

  const [{ isDragging, canDrag }, drag] = useDrag(
    () => ({
      type: 'SLOT',
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        canDrag: draggable,
      }),
      item: () =>
        !!item?.id
          ? { item: item, slot: index, draggable: draggable }
          : undefined,
    }),
    [item, draggable],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'SLOT',
      drop: (item: DragSource) => {
        if (
          item.slot !== hoveredSlot.slot ||
          item.item.owner !== hoveredSlot.owner
        ) {
          let auxAmount = parseInt(moveAmount);

          if (!isNaN(auxAmount)) {
            if (auxAmount < 0) return;

            if (auxAmount > item.item.quantity) {
              auxAmount = item.item.quantity;
            }
          } else {
            auxAmount = item.item.quantity;
          }

          fetchNui(INVENTORY_EVENTS.MOVE_ITEM, {
            ownerFrom: item.item.owner,
            ownerTo: hoveredSlot.owner,
            slotFrom: item.slot,
            slotTo: hoveredSlot.slot,
            id: item.item.id,
            quantityFrom: item.item.quantity,
            quantityTo: auxAmount,
            invTypeTo: hoveredSlot.invType,
            invTypeFrom: item.item.invType,
          });
        }
      },
    }),
    [item, hoveredSlot, moveAmount],
  );

  const connectRef = useCallback(
    (element: HTMLDivElement) => drag(drop(element)),
    [drag, drop],
  );

  const onMouseEnter = useCallback(
    (index: number, invType: number, owner: string) => {
      setHoveredItem(item);
      setHoveredSlot({
        slot: index,
        invType: invType,
        owner: owner,
      });
    },
    [item, setHoveredItem, setHoveredSlot],
  );

  const onMouseLeave = useCallback(() => {
    setHoveredItem(undefined);
  }, [setHoveredItem]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.shiftKey) {
        let data = {};

        if (item) {
          if (item.invType === 1) {
            data = {
              ownerFrom: item.owner,
              ownerTo: secondaryInventory.owner,
              slotFrom: item.slot,
              id: item.id,
              invTypeFrom: item.invType,
              invTypeTo: secondaryInventory.invType,
            };

            const openSlot = GetOpenSlot(
              secondaryInventory.inventory,
              secondaryInventory.size,
            );
          } else {
            data = {
              ownerFrom: secondaryInventory.owner,
              ownerTo: playerInventory.owner,
              slotFrom: item.slot,
              id: item.id,
              invTypeFrom: secondaryInventory.invType,
              invTypeTo: 1,
            };
          }

          fetchNui(INVENTORY_EVENTS.MOVE_NEXT, data, null);
        }
      }
    },
    [item, secondaryInventory, playerInventory],
  );

  useEffect(() => {
    document.body.onmousedown = (e) => {
      if (e.button === 1) {
        fetchNui(INVENTORY_EVENTS.USE_ITEM, hoveredSlot);
        return false;
      }
    };
  }, [hoveredSlot]);

  return useMemo(
    () => (
      <>
        <div
          ref={connectRef}
          id={index.toString()}
          className={`slot`}
          draggable={canDrag}
          onMouseEnter={() => {
            onMouseEnter(index, invType, owner);
          }}
          onMouseLeave={onMouseLeave}
          onClick={handleClick}
          style={{
            opacity: isDragging ? 0.6 : 1,
          }}
        >
          {item && (
            <>
              <img src={`images/${item.id}.png`} alt={item.label} />
              <div id="item-name">{item.label}</div>
              <div id="item-quantity">{item.quantity}x</div>
              <div id="item-weight">{item.weight}</div>
              <div id="item-quality"></div>
            </>
          )}
        </div>
      </>
    ),
    [
      item,
      index,
      canDrag,
      isDragging,
      connectRef,
      onMouseEnter,
      onMouseLeave,
      invType,
      owner,
      handleClick,
    ],
  );
}
