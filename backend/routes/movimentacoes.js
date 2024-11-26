app.get('/api/movimentacoes', async (req, res) => {
    try {
        const movimentacoes = await db.query('SELECT * FROM movimentacoes');
        res.json(movimentacoes.rows);
    } catch (error) {
        res.status(500).send('Erro ao buscar movimentações.');
    }
});
