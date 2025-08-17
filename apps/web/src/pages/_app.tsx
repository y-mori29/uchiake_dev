import "@/styles/globals.css";
import { Bars3Icon, BellAlertIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  PencilSquareIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  BookOpenIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppState, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import { Category, ResponseError } from "@/client";
import Image from "next/image";
import useRegisterRequiredModal, { RegisterModalProvider } from "@/hooks/UseRegisterRequiredModal";
import { useApiClients } from "@/hooks/UseApiClients";
import * as gtag from "@/libs/gtag";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const api = useApiClients();
  const { openRegisterModal } = useRegisterRequiredModal();
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    async function onMount() {

      try {
        setCategories(await api.getCategories());
      } catch (e) {
        console.error(e);
      }

      if (!isAuthenticated) return;

      try {
        const user = await api.getUser();
        if (!user) {
          await router.push("/register/start");
        }
      } catch (e) {
        if (e instanceof ResponseError && e.response?.status === 404) {
          await router.push("/register/start");
        }
      }

      const result = await api.hasUnreadNotifications();
      setHasUnreadNotifications(result.hasUnreadNotifications);
    }
    onMount();
  }, [isAuthenticated]);

  const moveToPostPage = async () => {
    if (!isAuthenticated) {
      openRegisterModal("うちあけを書き込む");
      return;
    }
    await router.push("/new/form");
    closeMenu()
  }

  const moveToSubPostPage = async () => {
    if (!isAuthenticated) {
      openRegisterModal("うちあけの続きを書き込む");
      return;
    }
    await router.push("/newsub/form");
    closeMenu()
  }

  useEffect(() => {
    const handleRouterChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);

  return (
    <div>
      <div className="flex flex-col">
        <header className="fixed top-0 z-50 flex h-14 w-full items-center bg-white px-4 py-2 shadow-md space-x-4">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
            {menuOpen ? <XMarkIcon className="size-6 shrink-0" /> : <Bars3Icon className="size-6 shrink-0" />}
          </button>

          <h1 className="flex justify-start text-lg font-bold">
            <Link href="/">
              <div className="flex items-center">
                <Image src="/imgs/logo.png" alt="うちあけ ロゴ" width={32} height={32} />
                <p className="ml-2 whitespace-nowrap">うちあけ</p>
              </div>
            </Link>
          </h1>

          <div className={"grow"} />

          {isAuthenticated ? (
            <>
              <Link href="/notification" className="items-center text-gray-600 transition hover:text-gray-800">
                <div className="relative">
                  {hasUnreadNotifications ? <BellAlertIcon className="size-8 shrink-0" /> : <BellIcon className="size-8 shrink-0" />}
                  {hasUnreadNotifications && (
                    <div className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500" />
                  )}
                </div>
              </Link><Link href="/profile" className="items-center text-gray-600 transition hover:text-gray-800">
                <UserCircleIcon className="size-8 shrink-0" />
              </Link>
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="flex items-center rounded-full bg-amber-600 px-4 py-1 text-sm font-medium text-white shadow-md hover:bg-amber-700 md:px-4"
            >
              <div className="flex items-center">
                <ArrowRightEndOnRectangleIcon className="mr-3 size-5" />
                <div className="flex flex-col text-xs">
                  <span>新規登録</span>
                  <span>ログイン</span>
                </div>
              </div>
            </button>
          )}
        </header>

        <div
          className={twMerge(
            "fixed left-0 top-0 z-40 h-full w-64 overflow-scroll bg-white shadow-lg transition-transform overscroll-none",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="h-12"></div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link href="/about" onClick={closeMenu}>
                  <button
                    className="flex w-full items-center px-4 py-3 text-left text-gray-700 transition hover:bg-gray-100">
                    <QuestionMarkCircleIcon className="mr-1 size-5" />
                    <span className="font-medium">「うちあけ」とは？</span>
                  </button>
                </Link>
              </li>

              <li className="my-4 border-t border-gray-300"></li>
              <li>
                <div className="flex items-center px-4 py-3 font-medium text-gray-700">
                  <BookOpenIcon className="mr-1 size-5" />
                  <span>うちあけを読む</span>
                </div>
                <ul className="ml-4 space-y-1">
                  <li>
                    <Link href="/post" onClick={closeMenu}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        最新のうちあけ
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/category" onClick={closeMenu}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        ジャンルごとに見る
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/search" onClick={closeMenu}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        検索する
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="my-4 border-t border-gray-300"></li>
              <li>
                <div className="flex items-center px-4 py-3 font-medium text-gray-700">
                  <PencilSquareIcon className="mr-1 size-5" />
                  <span>うちあけを書く</span>
                </div>
                <ul className="ml-4 space-y-1">
                  <li>
                    <div onClick={moveToPostPage}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        うちあけを書く
                      </button>
                    </div>
                  </li>
                  <li>
                    <div onClick={moveToSubPostPage}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        うちあけのつづきを書く
                      </button>
                    </div>
                  </li>
                </ul>
              </li>

              <li className="my-4 border-t border-gray-300"></li>
              <li>
                <div className="flex items-center px-4 py-3 font-medium text-gray-700">
                  <InformationCircleIcon className="mr-1 size-5" />
                  <span>サービス情報</span>
                </div>
                <ul className="ml-4 space-y-1">
                  <li>
                    <Link href="/terms" onClick={closeMenu}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        サービス規約
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" onClick={closeMenu}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        プライバシーポリシー
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://medi-canvas.com" onClick={closeMenu}>
                      <button className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100">
                        会社情報
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="my-4 border-t border-gray-300"></li>

              {isAuthenticated ? (
                <li>
                  <button
                    className="flex w-full items-center px-4 py-3 text-left text-gray-700 transition hover:bg-red-100 hover:text-red-600"
                    onClick={() => logout()}
                  >
                    <ArrowLeftEndOnRectangleIcon className="mr-1 size-5" />
                    <span className="font-medium">ログアウト</span>
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      className="flex w-full items-center px-4 py-2 text-left text-gray-700 transition hover:bg-amber-100 hover:text-amber-600"
                      onClick={() =>
                        loginWithRedirect({
                          authorizationParams: {
                            screen_hint: "signup",
                          },
                        })
                      }
                    >
                      <UserIcon className="mr-1 size-5" />
                      <span className="font-medium">新規登録</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex w-full items-center px-4 py-2 text-left text-gray-700 transition hover:bg-amber-100 hover:text-amber-600"
                      onClick={() =>
                        loginWithRedirect({
                          authorizationParams: {
                            screen_hint: "login",
                          },
                        })
                      }
                    >
                      <ArrowRightEndOnRectangleIcon className="mr-1 size-5" />
                      <span className="font-medium">ログイン</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="h-4"></div>
        </div>

        {menuOpen && <div
          className={twMerge(
            "fixed inset-0 z-30 bg-black opacity-50 transition-opacity",
            !menuOpen && "opacity-0",
            !menuOpen && "pointer-events-none",
          )}
          onClick={closeMenu}
        ></div>}

        <div className={twMerge("mx-auto w-full max-w-6xl flex-1")}>
          <div className="h-12"></div>
          <Component {...pageProps} />
        </div>

        <footer className="mt-8 bg-gray-100 py-8 text-gray-800">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-semibold">ナビゲーション</h3>
                <ul>
                  <li className="mb-2">
                    <Link href="/" className="transition hover:text-gray-300">
                      Top
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/about" className="transition hover:text-gray-300">
                      「うちあけ」とは？
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/post" className="transition hover:text-gray-300">
                      最新のうちあけ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2">
                <h3 className="mb-4 text-lg font-semibold">ジャンル</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/category/${category.id}`} className="transition hover:text-gray-300">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">会社情報</h3>
                <ul>
                  <li className="mb-2">
                    <Link href="/terms" className="transition hover:text-gray-300">
                      利用規約
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/privacy" className="transition hover:text-gray-300">
                      プライバシーポリシー
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="https://medi-canvas.com" className="transition hover:text-gray-300">
                      会社概要
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">&copy; 2025 うちあけ All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default function App({ Component, pageProps, router }: AppProps) {
  const usedRouter = useRouter();
  const onRedirectCallback = (appState: AppState | undefined) => {
    const returnTo = appState?.returnTo || "/";
    usedRouter.push(returnTo);
  };

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!,
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <RegisterModalProvider>
        <CustomApp Component={Component} pageProps={pageProps} router={router} />
      </RegisterModalProvider>
    </Auth0Provider>
  );
}
