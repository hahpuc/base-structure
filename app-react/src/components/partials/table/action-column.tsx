import { Button, Tooltip } from 'antd';

import { TableOption, TableRowData } from './models/table.model';

const ActionColumn = <T extends TableRowData>({
  actions,
  record,
}: {
  actions: TableOption<T>['actions'];
  record: T;
}) => {
  return (
    <div className="flex space-x-2">
      {actions?.map((action, idx) => {
        // Check visibility
        if (action.visible && !action.visible(record)) return null;

        const isDisabled = action.disable || false;

        return (
          <Tooltip key={idx} title={action.label}>
            <Button
              type="dashed"
              icon={action.icon}
              onClick={e => {
                e.stopPropagation();
                action.handler(record);
              }}
              disabled={isDisabled}
              size="small"
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

export default ActionColumn;
