import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/976e70112e603b704dd8192269594bd3/raw/1a76d3476ec82355ea21cb7d7704b7f7dc8fb26f/four-card-data.json';

const sectionWrapperEl = document.querySelector('.section-wrapper');
const sectionTemplate = document.getElementById('section-template');
const sectionHeadTemplate = document.getElementById('section-head-template');
const cardTemplate = document.getElementById('card-template');
const sectionBodyTemplate = document.getElementById('section-body-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	sectionWrapperEl.appendChild(errorEl);
};

const renderCardsContent = (data) => {
	const { summary: cardsSummaryData, list: cardsListData } = JSON.parse(data);

	const {
		subtitle: cardsSummarySubtitle,
		title: cardsSummaryTitle,
		description: cardsSummaryDescription,
	} = cardsSummaryData;

	const sectionTemplateNode = document.importNode(
		sectionTemplate.content,
		true
	);
	const sectionEl = sectionTemplateNode.querySelector('.section');

	/* [section head] */
	const sectionHeadTemplateNode = document.importNode(
		sectionHeadTemplate.content,
		true
	);
	const sectionHeadEl =
		sectionHeadTemplateNode.querySelector('.section__head');

	const cardsSummarySubtitleEl = sectionHeadEl.querySelector(
		'.cards-summary__subtitle'
	);
	cardsSummarySubtitleEl.textContent = cardsSummarySubtitle;

	const cardsSummaryTitleEl = sectionHeadEl.querySelector(
		'.cards-summary__title'
	);
	cardsSummaryTitleEl.textContent = cardsSummaryTitle;

	const cardsSummaryDescriptionEl = sectionHeadEl.querySelector(
		'.cards-summary__desc'
	);
	cardsSummaryDescriptionEl.textContent = cardsSummaryDescription;

	/* [section body] */
	const sectionBodyTemplateNode = document.importNode(
		sectionBodyTemplate.content,
		true
	);
	const sectionBodyEl =
		sectionBodyTemplateNode.querySelector('.section__body');

	const cardBlockEls = sectionBodyEl.querySelectorAll('.cards__block');

	let cardIndex = 0;
	for (const card of cardsListData) {
		const { title, description, image } = card;

		const cardTemplateNode = document.importNode(
			cardTemplate.content,
			true
		);
		const cardEl = cardTemplateNode.querySelector('.card');
		cardEl.classList.add('card--' + title.toLowerCase().replace(' ', '-'));

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = title;

		const cardDescriptionEl = cardEl.querySelector('.card__desc');
		cardDescriptionEl.textContent = description;

		const cardImage = cardEl.querySelector('.card__image img');
		cardImage.src = './images/icons/' + image;
		cardImage.alt = '';

		if (cardIndex === 0) {
			cardBlockEls[0].appendChild(cardTemplateNode);
		} else if (cardIndex === 1 || cardIndex === 2) {
			cardBlockEls[1].appendChild(cardTemplateNode);
		} else {
			cardBlockEls[2].appendChild(cardTemplateNode);
		}

		cardIndex++;
	}

	/* [init] */
	removeLoading();
	sectionEl.appendChild(sectionHeadTemplateNode);
	sectionEl.appendChild(sectionBodyTemplateNode);
	sectionWrapperEl.appendChild(sectionTemplateNode);
};

sendHttpRequest('GET', URL, renderCardsContent, handleError);
