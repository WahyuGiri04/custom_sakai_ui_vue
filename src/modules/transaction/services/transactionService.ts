import axios from 'axios';

export interface Transaction {
    statusKlaim: string;
    nomorKartu: string;
    nomorRekening: string;
    tanggalTransaksi: string;
    waktu: string;
    noReferensi: string;
    kodeTerminal: string;
    nominal: string;
    statusTransaksi: string;
    jenisPesan: string;
}

export class TransactionService {
    private static readonly BASE_URL = '/sample-data/sample-data-transaksi.json';
    static async fetchTransactions(): Promise<Transaction[]> {
        const { data } = await axios.get<Transaction[]>(this.BASE_URL);
        await new Promise((resolve) => setTimeout(resolve, 8000));
        return data;
    }
}
