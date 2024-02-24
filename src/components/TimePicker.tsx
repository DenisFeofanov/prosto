import { calculateNonWorkingHours } from "@/lib/utils";
import { WORKING_HOURS } from "@/shared/constants";
import { ConfigProvider, TimePicker as Picker } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import { Dayjs } from "dayjs";
import "dayjs/locale/ru";

interface Props {
  value?: Dayjs;
  onChange?: (date: Dayjs, dates: string | string[]) => void;
}

function TimePicker({ value, onChange }: Props) {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              timeColumnWidth: 100,
              timeCellHeight: 30,
              timeColumnHeight: 320,
            },
          },
        }}
      >
        <Picker
          locale={locale}
          minuteStep={30}
          size="large"
          placeholder=""
          format={"HH:mm"}
          allowClear={false}
          showNow={false}
          inputReadOnly={true}
          disabledTime={() => ({
            disabledHours() {
              return calculateNonWorkingHours(WORKING_HOURS);
            },
          })}
          hideDisabledOptions={true}
          value={value}
          onChange={onChange}
          needConfirm={false}
        />
      </ConfigProvider>

      <style jsx global>{`
        .ant-picker-time-panel-column:after {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default TimePicker;
