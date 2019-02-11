import algoliasearch from 'algoliasearch/reactnative';
import CONFIG from '../config';

// Algolia クライアントを設定
const algolia = algoliasearch(CONFIG.ALGOLIA_ID, CONFIG.ALGOLIA_ADMIN_KEY);
// const index = algolia.initIndex('masterSake');

export default class Utils {
  getIndex = async (keyWords) => {
    const uniqueKeyWords = keyWords.filter((x, i, self) => self.indexOf(x) === i);
    const queries = [];
    uniqueKeyWords.map((keyWord) => {
      queries.push({
        indexName: 'masterSake',
        query: keyWord,
      });
    });

    return new Promise((resolve, reject) => {
      algolia.search(queries, (err, content) => {
        if (err) {
          reject(err);
          return;
        }

        let array = [];
        content.results.map((result) => {
          array = array.concat(result.hits);
        });

        const uniqueArray = array.filter((x, i, self) => self.findIndex(v => x.name === v.name) === i);

        resolve(uniqueArray);
      });
    });
  }
}
