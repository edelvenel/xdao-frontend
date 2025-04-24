import React from "react";
import { DAOS_MOCK, IDao } from "shared/types";

export function useDaos() {
  const [daos, setDaos] = React.useState<IDao[]>([]);

  const mapper = React.useCallback((data: unknown[]): IDao[] => {
    //TODO: write a mapper for specific data (if needed)
    const result = data as IDao[];

    return result;
  }, []);

  const fetchDaos = React.useCallback(async () => {
    //get source data
    const sourceData = DAOS_MOCK; // TODO: replace with real implementation

    const formatedData: IDao[] = mapper(sourceData);
    setDaos(formatedData);
  }, [mapper]);

  const createDao = React.useCallback(async (dao: IDao): Promise<void> => {
    // create dao or throw error
    try {
      console.log("Dao successfully created", dao); // TODO: replace with real implementation
    } catch (error) {
      console.error("Unable to create dao", error);
      throw error;
    }
  }, []);

  const updateDao = React.useCallback(
    async (id: string, dao: IDao): Promise<void> => {
      // update dao or throw error
      try {
        console.log("Dao successfully updated", id, dao); // TODO: replace with real implementation
      } catch (error) {
        console.error("Unable to update dao", error);
        throw error;
      }
    },
    []
  );

  return { daos, fetchDaos, createDao, updateDao };
}
