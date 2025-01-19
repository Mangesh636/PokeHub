export interface PokemonCardProps {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
    front_default: string;
  };
  types: { type: { name: string } }[];
}
