import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
    // OR
    // <Iconify icon="fluent:mail-24-filled" />
    // https://icon-sets.iconify.design/solar/
    // https://www.streamlinehq.com/icons
);

const ICONS = {
    job: icon('ic_job'),
    blog: icon('ic_blog'),
    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    user: icon('ic_user'),
    file: icon('ic_file'),
    lock: icon('ic_lock'),
    tour: icon('ic_tour'),
    order: icon('ic_order'),
    label: icon('ic_label'),
    blank: icon('ic_blank'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    invoice: icon('ic_invoice'),
    product: icon('ic_product'),
    calendar: icon('ic_calendar'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
    const { t } = useTranslate();

    const data = useMemo(
        () => [
            // OVERVIEW
            // ----------------------------------------------------------------------
            {
                subheader: t('overview'),
                items: [
                    {
                        title: t('home'),
                        path: paths.dashboard.general.analytics,
                        icon: ICONS.dashboard,
                    },
                ],
            },

            // MANAGEMENT
            // ----------------------------------------------------------------------
            {
                subheader: t('management'),
                items: [
                    // PRODUCT
                    {
                        title: t('course'),
                        path: paths.dashboard.product.root,
                        icon: ICONS.product,
                        children: [
                            { title: t('list'), path: paths.dashboard.product.root },
                            { title: t('create'), path: paths.dashboard.product.new },
                        ],
                    },

                    // USER
                    {
                        title: t('students'),
                        path: paths.dashboard.user.list,
                        icon: ICONS.user,
                    },

                    // ORDER
                    {
                        title: t('orders'),
                        path: paths.dashboard.order.root,
                        icon: ICONS.order,
                    },

                    // FILE MANAGER
                    {
                        title: t('file_manager'),
                        path: paths.dashboard.fileManager,
                        icon: ICONS.folder,
                    },

                    // CHAT
                    {
                        title: t('chat'),
                        path: paths.dashboard.chat,
                        icon: ICONS.chat,
                    },
                ],
            },
        ],
        [t]
    );

    return data;
}
