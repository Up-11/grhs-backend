declare global {
	namespace PrismaJson {
		type ImageSide = 'left' | 'right'

		type EventContent = Record<string, TextWithLangs>

		type TextWithLangs = {
			ru: string
			en: string
		}

		type TwoLangArray = {
			ru: string[]
			en: string[]
		}

		type MinMaxValue = {
			value: number
			max: number
		}

		type Nutrition = {
			calories: {
				value: number
				max: number
				title: NUTRITION.CALORIES
			}
			proteins: {
				value: number
				max: number
				title: NUTRITION.PROTEINS
			}
			fats: {
				value: number
				max: number
				title: NUTRITION.FATS
			}
			carbohydrates: {
				value: number
				max: number
				title: NUTRITION.CARBS
			}
		}
	}
}

export enum NUTRITION {
	CALORIES = 'nutrition.calories',
	PROTEINS = 'nutrition.proteins',
	FATS = 'nutrition.fats',
	CARBS = 'nutrition.carbs'
}
