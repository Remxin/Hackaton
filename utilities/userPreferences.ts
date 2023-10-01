export default class UserPreferences {

    subject: { [key: string]: number }
    title: { [key: string]: number }
    price: { [key: string]: number }
    private static default_value = 50

    constructor() {

        this.subject = {
            information_technology: UserPreferences.default_value,
            chemistry: UserPreferences.default_value,
            biology: UserPreferences.default_value,
            art: UserPreferences.default_value,
            economy: UserPreferences.default_value,
        }

        this.title = {
            magister: UserPreferences.default_value
        }

        this.price = {
            free: UserPreferences.default_value,
            under1000: UserPreferences.default_value,
            over1000: UserPreferences.default_value,
            over2000: UserPreferences.default_value,
        }

    }

    like = {
        /**
      * Adds a point to the key passed as the argument.
      * If key is not found it will be created automatically.
      * 
      * @param key - string
      */
        subject: (subject_name: string) => {

            if (this.subject[subject_name] === undefined) {
                this.subject[subject_name] = UserPreferences.default_value + 1
                return
            }
            this.subject[subject_name] += 1
        },
        /**
             * Adds a point to the key passed as the argument.
             * If key is not found it will be created automatically.
             * 
             * @param key - string
             */
        earnedTitle: (title_name: string) => {

            if (this.title[title_name] === undefined) {
                this.title[title_name] = UserPreferences.default_value + 1
                return
            }
            this.title[title_name] += 1

        },
        /**
             * Adds a point to the key passed as the argument.
             * If key is not found it will be created automatically.
             * 
             * @param key - string
             */
        price: (price: number) => {
            if (price === 0) {
                this.price.free += 1
            }
            else if (price > 2000) {
                this.price.over2000 += 1
            }
            else if (price > 1000) {
                this.price.over1000 += 1
            }
            else {
                this.price.under1000 += 1
            }
        }
    }

    dislike = {

        /**
         * Removes a point from the key passed as the argument.
         * If key is not found it will be created automatically.
         * 
         * @param key - string
         */
        subject: (subject_name: string) => {

            if (this.subject[subject_name] === undefined) {
                this.subject[subject_name] = UserPreferences.default_value - 1
                return
            }
            this.subject[subject_name] -= 1
        },
        /**
                * Removes a point from the key passed as the argument.
                * If key is not found it will be created automatically.
                * 
                * @param key - string
                */
        earnedTitle: (title_name: string) => {

            if (this.title[title_name] === undefined) {
                this.title[title_name] = UserPreferences.default_value - 1
                return
            }
            this.title[title_name] -= 1

        },
        /**
                * Removes a point from the key passed as the argument.
                * If key is not found it will be created automatically.
                * 
                * @param key - string
                */
        price: (price: number) => {
            if (price === 0) {
                this.price.free -= 1
            }
            else if (price > 2000) {
                this.price.over2000 -= 1
            }
            else if (price > 1000) {
                this.price.over1000 -= 1
            }
            else {
                this.price.under1000 -= 1
            }
        }
    }

    /**
     * Analyze the data fetched from the database
     */
    analyze(...args: Array<{ subject: string, earnedTitle: string, price: number }>) {

        const helper: Array<{ subject: string, earnedTitle: string, price: number, total_points: number }> = []

        //count total points
        for (let record of args) {

            const price_points = this.price[record.price] ? this.price[record.price] : UserPreferences.default_value
            const subject_points = this.subject[record.subject] ? this.subject[record.subject] : UserPreferences.default_value
            const title_points = this.title[record.earnedTitle] ? this.title[record.earnedTitle] : UserPreferences.default_value

            helper.push({
                subject: record.subject, earnedTitle: record.earnedTitle, price: record.price,
                total_points: price_points + subject_points + title_points
            })
        }

        //array sort
        for (let i = 0; i <= helper.length - 1; i++) {
            if (helper[i] > helper[i + 1]) {
                const value = helper[i]
                helper[i] = helper[i + 1]
                helper[i + 1] = value
            }
        }

        console.log(helper);
        //TODO: test and fix array sort
    }
}