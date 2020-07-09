import MainModel from '../models/mainModel';

export default async function increaseGameStatistic(game) {
    const mainModel = new MainModel();
    let statisticData = await mainModel.getUserStatistic();
    delete statisticData.id;
    statisticData.optional.games[game] += 1;
    await mainModel.setUserStatistic(statisticData);

}