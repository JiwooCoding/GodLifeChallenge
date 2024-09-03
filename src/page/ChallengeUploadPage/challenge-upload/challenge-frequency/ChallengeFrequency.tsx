import React, { useState } from 'react'
import { extractDateOnlyUsingDateFns } from '../../../../utils/extractDateOnly';

type FrequencyOption = 'daily' | 'weekdays' | 'weekends';

interface ChallengeFrequencyProps {
    startDate:string;
    endDate:string;
}

const ChallengeFrequency = ({startDate, endDate}) => {

    const [frequency, setFrequency] = useState<FrequencyOption | null>(null);

    const calculateDates = (frequency:FrequencyOption) => {
        const dates:Date[] = [];
        
        //string타입인 날짜 Date 타입으로 변환
        const start = extractDateOnlyUsingDateFns(startDate);
        const end = extractDateOnlyUsingDateFns(endDate);



    }

    return (
        <div>
            <button>매일</button>
            <button>평일</button>
            <button>주말</button>
        </div>
    )
}

export default ChallengeFrequency