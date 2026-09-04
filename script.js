function renderHeroesGrid() {
    // Очищаем все контейнеры классов перед заполнением
    const containers = {
        str: document.getElementById("str-container"),
        agi: document.getElementById("agi-container"),
        int: document.getElementById("int-container"),
        uni: document.getElementById("uni-container")
    };
    
    Object.values(containers).forEach(c => { if (c) c.innerHTML = ""; });

    heroesPool.forEach(hero => {
        const targetContainer = containers[hero.attr];
        if (!targetContainer) return;

        const card = document.createElement("div");
        card.className = "hero-card";
        card.id = `grid-hero-${hero.id}`;
        
        // Новая контрастная верстка плашки: крупные иконки (20px) и жирные белые имена
        card.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 100%; height: 100%; padding-top: 5px; box-sizing: border-box;">
                <span style="font-size: 20px; line-height: 1;">${hero.icon}</span>
                <div style="background: rgba(0, 0, 0, 0.75); width: 100%; text-align: center; padding: 2px 0;">
                    <span style="font-size: 8.5px; font-weight: 900; color: #ffffff; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap; display: block; overflow: hidden; text-overflow: ellipsis; max-width: 100%; padding: 0 2px; box-sizing: border-box;">${hero.name}</span>
                </div>
            </div>
        `;
        
        card.addEventListener("click", () => selectHero(hero.id));
        targetContainer.appendChild(card);
    });
}
