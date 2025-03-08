export const countTask = (tasks, type) => {
    let complete = 0, pending = 0;

    tasks.map((item) => {
        if (checkValid(item, type)) {
            if (item.complete)
                complete++;
            else
                pending++;
        }

    })

    return { complete: complete, pending: pending,total:complete+pending };
}
const checkValid = (item, type) => {

    switch (type) {
        case 'all_task': return true;
        case 'importent': return item.importent;
        case 'today': return new Date(item.date).getDate() === new Date().getDate();
        default: return true;
    }
}