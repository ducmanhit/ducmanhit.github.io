
export interface School {
  id: string;
  logoUrl: string;
  name: string;
  website: string;
  adminEmail: string;
  address: string;
  phone: string;
}

export interface VerificationLetterData {
  school: School;
  teacher: {
    name: string;
    title: string;
    email: string;
    startDate: string;
  };
  principal: {
    name: string;
    title: string;
  };
  letter: {
    date: string;
    recipient: string;
    subject: string;
    body: string;
  };
}