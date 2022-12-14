import useScheduleForm from 'hooks/useScheduleForm';
import {
  HOUR_LIST,
  INITIAL_SELECTED_TIME,
  MINUTE_LIST,
} from 'libs/utils/Constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Schedule } from 'types/customTypes';
import AMPM from './components/AMPM';
import DayOfWeek from './components/DayOfWeek';
import SelectBox from './components/SelectBox';
import { getClassEndTime, getEndTimeIsAM } from './utils/index';

function AddSchedulePage() {
  const [timeToggle, setTimeToggle] = React.useState<string>('');
  const [selectDay, setSelectDay] = React.useState<string[]>([]);
  const [selectedTime, setSelectedTime] = React.useState<Schedule>(
    INITIAL_SELECTED_TIME,
  );
  const { onSubmitSchedule } = useScheduleForm();
  const navigate = useNavigate();
  const disabledCondition =
    selectedTime.startTime.isAM === null ||
    selectedTime.startTime.hour === 0 ||
    selectDay.length <= 0;

  const onSelectSchedule = (selectedSchedule: string, timeType: string) => {
    setSelectedTime(({ startTime }): any => {
      const endTime = getClassEndTime({
        ...startTime,
        [timeType]: selectedSchedule,
      });
      const isEndTimeAM = getEndTimeIsAM(
        startTime.hour,
        endTime.hour,
        startTime.isAM,
      );

      return {
        startTime: {
          ...startTime,
          [timeType]: selectedSchedule,
        },
        endTime: {
          ...endTime,
          isAM: startTime.isAM === null ? null : isEndTimeAM,
        },
      };
    });
  };

  return (
    <section className="w-full px-10">
      <h1 className="my-10 text-xl font-bold">Add class schedule</h1>
      <article className="border border-solid border-gray-200 p-7 bg-zinc-50  text-[16px] font-bold">
        <div className="md:flex md:items-center">
          <div className="md:flex md:w-[10%] mb-2">Start time</div>
          <div className="flex w-full md:mr-2 md:w-[150px]">
            <section className="flex justify-between items-center font-normal w-full">
              {['hour', 'minute'].map((timeType) => (
                <React.Fragment key={`container_${timeType}`}>
                  <SelectBox
                    key={`timeType_${timeType}`}
                    className="bg-zinc-50 h-12 min-w-20 w-full border border-solid border-gray-300 text-center z-10"
                    optionList={timeType === 'hour' ? HOUR_LIST : MINUTE_LIST}
                    selectedOption={
                      timeType === 'hour'
                        ? selectedTime.startTime.hour
                        : selectedTime.startTime.minute
                    }
                    onSelectOption={(option: string) => {
                      onSelectSchedule(option, timeType);
                    }}
                    formatOption={(option: string) => option.padStart(2, '0')}
                  />
                  <span
                    key={`colon_${timeType}`}
                    className={`${
                      timeType === 'hour' ? 'block' : 'hidden'
                    } block mx-1`}
                  >
                    :
                  </span>
                </React.Fragment>
              ))}
            </section>
          </div>
          <AMPM
            timeToggle={timeToggle}
            setTimeToggle={(value: string) => {
              setTimeToggle(value);
              setSelectedTime(({ startTime, endTime }: Schedule) => ({
                startTime: { ...startTime, isAM: value === 'AM' },
                endTime: {
                  ...endTime,
                  isAM: getEndTimeIsAM(
                    startTime.hour,
                    endTime.hour,
                    value === 'AM',
                  ),
                },
              }));
            }}
          />
        </div>
        <div className="flex flex-wrap md:flex md:items-center md:mt-32">
          <div className="md:flex md:w-[10%] my-2">Repeat on</div>
          <DayOfWeek selectDay={selectDay} setSelectDay={setSelectDay} />
        </div>
      </article>
      <div className="md:w-full md:flex md:justify-end">
        <button
          className={` w-full mt-1 md:w-[15%] h-10 md:mx-9 md:mt-4 rounded-lg ${
            disabledCondition ? 'bg-gray-400' : 'bg-buttonColor'
          } font-bold text-zinc-50`}
          type="button"
          disabled={disabledCondition}
          onClick={() => {
            const foo = async () => {
              try {
                const response = await onSubmitSchedule(
                  selectDay,
                  selectedTime,
                );
                if (response) {
                  alert('Schedule saved!');
                  navigate('/');
                } else {
                  alert('Current schedule is overlapped!');
                }
              } catch (error) {
                throw new Error(error as string);
              }
            };
            foo();
          }}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default AddSchedulePage;
