const getRequestCakkMessageTemplate = requestTemplate => {
	return `
	-------------------------------------------
	🤩🤩🤩
	Эй, мешок с костями! Тут заявка - связись!

	🙂 Имя заявки: ${req.query.name}
	📨 Почта заявки: ${req.query.email}
	📞 Телефон заявки: ${req.query.phone}`
}

module.exports = getRequestCakkMessageTemplate;