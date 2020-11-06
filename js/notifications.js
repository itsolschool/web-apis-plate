$(function () {

    let showed = 0

    const btn = $('#notification_btn');

    function renderBtn() {
        if (!"Notification" in window) {
            btn
                .text('Браузер не поддерживает уведомления')
                .disable()
                .addClass('btn-disabled')
        }

        switch (Notification.permission) {
            case "default": {
                btn.text('Дать разрешение')
                    .addClass('btn-info')
                break
            }
            case "denied": {
                btn.text('Всё же дать разрешение')
                    .removeClass('btn-info btn-success')
                    .addClass('btn-danger')
                break
            }
            case "granted": {
                btn.text('Показать уведомление')
                    .removeClass('btn-success btn-danger')
                    .addClass('btn-info')
            }
        }
    }

    function showNotification() {
        // Create and show the notification
        // let img = '/to-do-notifications/img/icon-128.png';
        let text = showed > 1 ? `Приветусики изнутри x${showed}!\n(Кликни)` : `Приветусики изнутри!\n(Кликни)`;
        let notification = new Notification('✨✨✨ Тадам! ✨✨✨', {body: text});

        notification.onclick = () => alert('Клик...')
    }

    btn.on('click', function () {
        if (Notification.permission === 'granted') {
            showed++
            showNotification()
        } else {
            askNotificationPermission()
        }
        renderBtn()

    })

    function askNotificationPermission() {
        // function to actually ask the permissions
        function handlePermission(permission) {
            // Whatever the user answers, we make sure Chrome stores the information
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            renderBtn()
        }

        // Let's check if the browser supports notifications
        if (!"Notification" in window) {
            console.log("This browser does not support notifications.");
        } else {
            if (checkNotificationPromise()) {
                Notification.requestPermission()
                    .then((permission) => {
                        handlePermission(permission);
                    })
            } else {
                Notification.requestPermission(function (permission) {
                    handlePermission(permission);
                });
            }
        }
    }

    function checkNotificationPromise() {
        try {
            Notification.requestPermission().then();
        } catch (e) {
            return false;
        }

        return true;
    }

    renderBtn()
})


