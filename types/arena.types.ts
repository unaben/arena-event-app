export interface IArenaEventResponse {
  id: number;
  location: string;
  date: string;
  slug: string;
  title: string;
  description: string;
  images: {
    mobile: string;
    tablet_port: string;
    tablet_land: string;
    desktop: string;
  };
  gates_open: string;
  first_race: string;
  last_race: string;
  no_of_races: string;
  race_type: string;
  web_sale_start: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
}
