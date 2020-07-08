import MainModel from '../models/mainModel';

export default async function increaseGameStatistic(game) {
    const mainModel = new MainModel();
    let statisticData = await mainModel.getUserStatistic();
    // console.log("1: ", statisticData);
    for (let key in statisticData.optional.games) {
        if (game === key) {
            statisticData.optional.games[game] += 1;
        }
    }

    await mainModel.setUserStatistic(statisticData);

}