export type Environment = {
  key: string;
  title: string;
};

export type Plant = {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  hour: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
};
