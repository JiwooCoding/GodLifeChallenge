import Button from '../../../../components/button/Button'

interface AttendanceButtonProps {
    BtnClickHandler: () => void;
    isButtonDisabled: boolean;
    hasAttendance: boolean;
}

const AttendanceButton = ({BtnClickHandler,isButtonDisabled,hasAttendance}:AttendanceButtonProps) => {

    

    return (
        <div className="button-container">
            <Button 
                onclick={BtnClickHandler}
                disabled={isButtonDisabled}
                variant='attendance'
            >
                {hasAttendance ? '내일 또 봐요' : '출석체크'}
            </Button>
        </div>
    )
}

export default AttendanceButton