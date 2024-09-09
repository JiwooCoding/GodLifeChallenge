import { useState, useEffect } from 'react';
import { donationData } from '../data/donationData';
import api from '../api/api';


interface DonationAmounts {
    [key: string]: number;
}

interface Finished {
    [key: string]: boolean;
}

const useDonationData = () => {
    const [donationAmounts, setDonationAmounts] = useState<DonationAmounts>({});
    const [finished, setFinished] = useState<Finished>({});
    const [goal, setGoal] = useState(100000);

    useEffect(() => {
    const fetchDataAndCheckGoal = async() => {
        try {
        const updatedDonationAmounts: DonationAmounts = {};
        const updatedFinished: Finished = {};

        for (const donation of donationData) {
            const response = await api.get(`/api/donation/view/${donation.id}`);
            const amount = response.data.currentAmount;
            const targetAmount = response.data.targetAmount;
            setGoal(targetAmount);
            updatedDonationAmounts[donation.id] = amount;
            updatedFinished[donation.id] = amount >= targetAmount;
        }

        setDonationAmounts(updatedDonationAmounts);
        setFinished(updatedFinished);
        } catch (error) {
            console.log('서버에서 기부 총 금액 가져오기 실패', error);
        }
    };

    fetchDataAndCheckGoal();
    }, []);

    return { donationAmounts, finished, goal };
};

export default useDonationData;
