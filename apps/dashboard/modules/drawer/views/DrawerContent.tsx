import drawerItems from '@dashboard/modules/drawer/beans/drawer-items';
import { DrawerItem } from '@dashboard/modules/drawer/types/drawer-item';
import ControlContainer from '@dashboard/modules/drawer/views/ControlContainer';

type DrawerContentProps = {
  items: DrawerItem[];
};

function DrawerContent() {
  return <_DrawerContent items={drawerItems} />;
}

function _DrawerContent({ items }: DrawerContentProps) {
  return (
    <div className="flex flex-col justify-start items-start overflow-y-scroll">
      {items.map(({ title, description, component }) => (
        <div
          key={`drawer-item-${title}`}
          className="mt-1 mb-2 py-4 border-b-[1px] border-[#e0e0e0] w-full"
        >
          <div className="px-4">
            <ControlContainer
              title={title}
              description={description}
              ControlComponent={component}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DrawerContent;
