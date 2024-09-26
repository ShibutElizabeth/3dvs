import { Canvas } from "@react-three/fiber";
import {
    Lightformer,
    OrbitControls,
    Environment,
} from "@react-three/drei";
import Base from "./components/Base";

export const App = () => {
  return ( 
    <> 
      <Canvas
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        shadows
        camera={{
        position: [
            3, 6, 6
        ],
        fov: 50,
        }}>
        <color attach="background" args={["#3d2b1f"]}/>
        <ambientLight intensity={0.5} color={"#ffe4b5"} />
        <directionalLight
          intensity={0.8}
          position={[10, 10, 10]}
          color={"#ffd27f"} // Теплый свет
          castShadow />
        <pointLight
          intensity={0.5}
          position={[0, 2, 0]} // Центр крыши
          color={"#ffcc99"} // Мягкий теплый цвет
          castShadow />
        <spotLight
          intensity={0.7}
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          color={"#ffb347"} // Теплый акцентный свет
          castShadow />
        <Base/>
        <Environment>
            <Lightformer
                intensity={3}
                position={[10, 15, 0]}
                scale={[10, 50, 1]}
                onUpdate={(self) => self.lookAt(0, 0, 0)}/>
        </Environment>
        <OrbitControls/>
      </Canvas> 
    </>
  );
}
